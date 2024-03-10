package food

import "github.com/gofiber/fiber/v2"

// "github.com/gofiber/fiber/v2"
// "github.com/uowcs/CSIT214/internal/models"

type FoodController struct {
	storage *FoodStorage
}

func NewFoodController(storage *FoodStorage) *FoodController {
	return &FoodController{
		storage: storage,
	}
}

func (a *FoodController) CreateSchemas(c *fiber.Ctx) error {
	err := a.storage.CreateSchemas()
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	return c.SendString("Schemas created")
}
