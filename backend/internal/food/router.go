package food

import "github.com/gofiber/fiber/v2"

func AddFoodRoutes(app *fiber.App, controller *FoodController) {
	Food := app.Group("/")
	Food.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("Healthy!")
	})
	Food.Get("/create-schemas", controller.CreateSchemas)
}
