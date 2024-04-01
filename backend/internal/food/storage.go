package food

import (
	"internal/models"

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

func (a *FoodStorage) TestSchema() error {
	// Create the table
	err := a.db.AutoMigrate(&models.Shop{})
	if err != nil {
		return err
	}
	return nil
}

// GetUserAddress fetches the address of a user by their ID.
// func (a *FoodStorage) GetUserAddress(userID string) (string, error) {
// 	var user models.User
// 	result := a.db.First(&user, "id = ?", userID)
// 	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
// 		return "", result.Error
// 	}
// 	return user.Address, nil
// }

// // GetStoreAddress fetches the address of a store by its ID.
//
//	func (a *FoodStorage) GetStoreAddress(storeID string) (string, error) {
//		var store models.Store
//		result := a.db.First(&store, "id = ?", storeID)
//		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
//			return "", result.Error
//		}
//		return store.Address, nil
//	}
//
// GetUserAddress fetches the address of a user by their ID.
func (fs *FoodStorage) GetUserAddress(userID string) (string, error) {
	var user models.User
	if result := fs.db.First(&user, "id = ?", userID); result.Error != nil {
		return "", result.Error
	}
	return user.Address, nil
}

// GetStoreAddress fetches the address of a store by its ID.
func (fs *FoodStorage) GetStoreAddress(storeID string) (string, error) {
	var store models.Store
	if result := fs.db.First(&store, "id = ?", storeID); result.Error != nil {
		return "", result.Error
	}
	return store.Address, nil
}
