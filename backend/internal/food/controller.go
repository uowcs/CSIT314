package food

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"internal/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// "github.com/gofiber/fiber/v2"
// "internal/models"

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

func (a *FoodController) TestSchema(c *fiber.Ctx) error {
	err := a.storage.TestSchema()
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	return c.SendString("Food created")
}
func (fc *FoodController) GetDistance(c *fiber.Ctx) error {
	// Get user ID and store ID from the request query
	userID := c.Query("userId")
	storeID := c.Query("storeId")

	// Retrieve the user's address from the database
	userAddress, err := fc.storage.GetUserAddress(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(404).SendString("User not found")
		}
		return c.Status(500).SendString("Error retrieving user address")
	}

	// Retrieve the store's address from the database
	storeAddress, err := fc.storage.GetStoreAddress(storeID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(404).SendString("Store not found")
		}
		return c.Status(500).SendString("Error retrieving store address")
	}
	fmt.Print(userAddress)
	fmt.Print(storeAddress)
	// Construct the Google Maps API request
	// googleAPIKey := os.Getenv("GOOGLE_MAPS_API_KEY")
	googleAPIKey := "AIzaSyBwacgStcydY__k_y1AmDNf8S3xhzUTe4E"
	googleMapsURL := fmt.Sprintf("https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s",
		url.QueryEscape(userAddress),
		url.QueryEscape(storeAddress),
		googleAPIKey,
	)

	resp, err := http.Get(googleMapsURL)
	if err != nil {
		return c.Status(500).SendString("Failed to request distance calculation from Google Maps API")
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.Status(500).SendString("Failed to read response from Google Maps API")
	}

	var data struct {
		Rows []struct {
			Elements []struct {
				Distance struct {
					Value int `json:"value"`
				} `json:"distance"`
				Duration struct {
					Text string `json:"text"`
				} `json:"duration"`
			} `json:"elements"`
		} `json:"rows"`
		Status string `json:"status"`
	}

	err = json.Unmarshal(body, &data)
	if err != nil || data.Status != "OK" {
		return c.Status(500).SendString("Failed to parse response from Google Maps API")
	}

	// Prepare the response data
	distanceData := models.DistanceResponse{
		Distance: data.Rows[0].Elements[0].Distance.Value,
		Duration: data.Rows[0].Elements[0].Duration.Text,
	}

	// Send the response back
	return c.Status(200).JSON(distanceData)
}
