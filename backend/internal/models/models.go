package models

import "gorm.io/gorm"

type Meal struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}
