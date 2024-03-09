package config

import (
	"errors"
	"fmt"
	"os"

	"github.com/spf13/viper"
)

type EnvVars struct {
	PORT         string `mapstructure:"PORT"`
	DATABASE_URL string `mapstructure:"DATABASE_URL"` // This will either come directly from the env or be constructed.
}

func LoadConfig() (config EnvVars, err error) {
	env := os.Getenv("GO_ENV")
	if env == "production" {
		config.PORT = os.Getenv("PORT")
		config.DATABASE_URL = os.Getenv("DATABASE_URL") // Assume DATABASE_URL is directly provided in production.
	} else {
		viper.AddConfigPath(".")
		viper.SetConfigName("app")
		viper.SetConfigType("env")

		viper.AutomaticEnv()

		err = viper.ReadInConfig()
		if err != nil {
			return EnvVars{}, err
		}

		err = viper.Unmarshal(&config)
		if err != nil {
			return EnvVars{}, err
		}

		// Construct DATABASE_URL if it's not directly provided.
		if config.DATABASE_URL == "" {
			config.DATABASE_URL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
				viper.GetString("POSTGRES_USER"),
				viper.GetString("POSTGRES_PASSWORD"),
				viper.GetString("POSTGRES_HOST"),
				viper.GetString("POSTGRES_PORT"),
				viper.GetString("POSTGRES_DB"))
		}
	}

	if config.PORT == "" || config.DATABASE_URL == "" {
		err = errors.New("PORT and DATABASE_URL must be provided")
		return EnvVars{}, err
	}

	return config, nil
}
