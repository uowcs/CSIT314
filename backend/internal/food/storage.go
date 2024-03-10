package food

import (
	"github.com/uowcs/CSIT214/internal/models"
	"gorm.io/gorm"
)

type FoodStorage struct {
	db *gorm.DB
}

func NewFoodStorage(db *gorm.DB) *FoodStorage {
	return &FoodStorage{db: db}
}

func (a *FoodStorage) CreateSchemas() error {
	// Create the table
	err := a.db.AutoMigrate(&models.Meal{})
	if err != nil {
		return err
	}
	return nil
}
