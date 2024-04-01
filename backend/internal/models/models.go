package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type DistanceResponse struct {
	Distance int    `json:"distance"` // Distance in meters
	Duration string `json:"duration"` // Human-readable duration
}
type Meal struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

type Shop struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
}

// Enums
type Role string

const (
	RoleUser  Role = "user"
	RoleAdmin Role = "admin"
)

type Mode string

const (
	ModeBuyer  Mode = "buyer"
	ModeSeller Mode = "seller"
)

type Category string

const (
	CategoryAsian    Category = "Asian"
	CategoryDessert  Category = "Dessert"
	CategoryDrinks   Category = "Drinks"
	CategoryWestern  Category = "Western"
	CategoryFastFood Category = "Fast Food"
)

// User represents the 'users' table in PostgreSQL with GORM annotations
type User struct {
	gorm.Model
	ID                     string `gorm:"primaryKey"`
	Name                   string
	Address                string
	Email                  string `gorm:"uniqueIndex"`
	EmailClerk             string
	EmailVerified          *time.Time
	Image                  string
	Role                   Role `gorm:"default:user"`
	Mode                   Mode `gorm:"default:buyer"`
	StripeCustomerID       string
	StripePriceID          string
	CurrentCartId          string
	StripeCurrentPeriodEnd string
	StripeSubscriptionID   string
	CreatedAt              time.Time `gorm:"autoCreateTime"`
	UpdatedAt              time.Time `gorm:"autoUpdateTime"`
	// Relations
	UsersToProducts []UsersToProducts
	Capabilities    []Capability
	Accounts        []Account
	Products        []Product `gorm:"foreignKey:UserID"`

	Stores []Store `gorm:"foreignKey:UserID"` // Indicates User has many Stores

	Todos []Todo
	Carts []Cart
}

// Account represents the 'accounts' table with GORM annotations
type Account struct {
	gorm.Model
	UserId                string `gorm:"not null;index:idx_user_id"`
	Type                  string `gorm:"not null"`
	AccessToken           string
	ExpiresAt             *int
	IdToken               string
	Provider              string `gorm:"not null"`
	ProviderAccountId     string `gorm:"not null"`
	RefreshTokenExpiresIn *int
	RefreshToken          string
	Scope                 string
	SessionState          string
	TokenType             string
	// Relations
	User User `gorm:"foreignKey:UserId"`
}

// Session represents the 'sessions' table with GORM annotations
type Session struct {
	SessionToken string    `gorm:"primaryKey"`
	UserId       string    `gorm:"not null"`
	Expires      time.Time `gorm:"not null"`
	// Relations
	User User `gorm:"foreignKey:UserId"`
}

// VerificationToken represents the 'verificationToken' table with GORM annotations
type VerificationToken struct {
	Identifier string    `gorm:"primaryKey"`
	Token      string    `gorm:"primaryKey"`
	Expires    time.Time `gorm:"not null"`
}

// StripeEvent represents the 'stripe' table with GORM annotations
type StripeEvent struct {
	gorm.Model
	Account         string
	APIVersion      string
	Created         time.Time
	Data            string `gorm:"type:json"`
	LiveMode        bool
	Object          string
	PendingWebhooks float32
	Request         string `gorm:"type:json"`
	Type            string
}

// Todo represents the 'todos' table with GORM annotations
type Todo struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Position  int    `gorm:"default:0"`
	Content   string `gorm:"not null"`
	Done      bool
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UserId    string    `gorm:"not null"`
	// Relations
	Author User `gorm:"foreignKey:UserId"`
}

// Store represents the 'stores' table with GORM annotations
type Store struct {
	gorm.Model
	UserID uint
	User   User `gorm:"foreignKey:UserID"`

	Name            string `gorm:"not null"`
	Description     string
	Address         string
	Slug            string
	Active          bool `gorm:"default:false"`
	StripeAccountId string
	// Relations
	Products []Product `gorm:"foreignKey:StoreID"` // Products available in this store

	Payments  []Payment
	StoreUser User `gorm:"foreignKey:UserId"`
}

// Product represents the 'products' table with GORM annotations
type Product struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null"`
	StoreId     uint   `gorm:"not null;default:1"`
	Description string
	Images      string   `gorm:"type:json"`
	Category    Category `gorm:"not null;default:food"`
	Subcategory string
	Price       float64   `gorm:"not null;default:0"`
	Inventory   int       `gorm:"not null;default:0"`
	Rating      int       `gorm:"not null;default:0"`
	Tags        string    `gorm:"type:json"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	// Relations
	Store     Store `gorm:"foreignKey:StoreId"`
	StoreUser User  `gorm:"foreignKey:StoreId"`
	UserID    uint  // This ties a Product to a User
	StoreID   uint
}

// Cart represents the 'carts' table with GORM annotations
type Cart struct {
	ID              uint `gorm:"primaryKey;autoIncrement"`
	UserId          sql.NullString
	Email           sql.NullString
	ClientSecret    sql.NullString
	PaymentIntentId sql.NullString
	Items           string    `gorm:"type:json"`
	Closed          bool      `gorm:"default:false"`
	CreatedAt       time.Time `gorm:"autoCreateTime"`
	// Relations
	User  User  `gorm:"foreignKey:UserId"`
	Store Store `gorm:"foreignKey:UserId"`
}

// Email represents the 'emails' table with GORM annotations
type Email struct {
	ID            uint `gorm:"primaryKey;autoIncrement"`
	UserId        sql.NullString
	Email         string    `gorm:"not null"`
	Token         string    `gorm:"not null"`
	Newsletter    bool      `gorm:"default:false"`
	Marketing     bool      `gorm:"default:false"`
	Transactional bool      `gorm:"default:false"`
	CreatedAt     time.Time `gorm:"autoCreateTime"`
}

// Payment represents the 'payments' table with GORM annotations
type Payment struct {
	ID                     uint   `gorm:"primaryKey;autoIncrement"`
	StoreId                uint   `gorm:"not null"`
	StripeAccountId        string `gorm:"not null"`
	StripeAccountCreatedAt *int
	StripeAccountExpiresAt *int
	DetailsSubmitted       bool      `gorm:"default:false"`
	CreatedAt              time.Time `gorm:"autoCreateTime"`
	// Relations
	Store Store `gorm:"foreignKey:StoreId"`
}

// Order represents the 'orders' table with GORM annotations
type Order struct {
	ID                        uint   `gorm:"primaryKey;autoIncrement"`
	StoreId                   uint   `gorm:"not null"`
	Items                     string `gorm:"type:json"`
	Quantity                  int
	Amount                    float64 `gorm:"not null;default:0"`
	StripePaymentIntentId     string  `gorm:"not null"`
	StripePaymentIntentStatus string  `gorm:"not null"`
	Name                      sql.NullString
	Email                     sql.NullString
	AddressId                 sql.NullInt64
	CreatedAt                 time.Time `gorm:"autoCreateTime"`
}

// Address represents the 'addresses' table with GORM annotations
type Address struct {
	ID         uint `gorm:"primaryKey;autoIncrement"`
	Line1      sql.NullString
	Line2      sql.NullString
	City       sql.NullString
	State      sql.NullString
	PostalCode sql.NullString
	Country    sql.NullString
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}

// UsersToProducts represents the 'users_to_products' table with GORM annotations
type UsersToProducts struct {
	UserID    string `gorm:"primaryKey"`
	ProductID string `gorm:"primaryKey"`
	// Relations
	User    User    `gorm:"foreignKey:UserID"`
	Product Product `gorm:"foreignKey:ProductID"`
}

// Guest represents the 'guests' table with GORM annotations
type Guest struct {
	ID        string `gorm:"primaryKey"`
	Email     sql.NullString
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	// Relations
	UsersToProducts []UsersToProducts
	Products        []Product
	Todos           []Todo
	Carts           []Cart
}

// Capability represents the 'capabilities' table with GORM annotations
type Capability struct {
	ID           uint      `gorm:"primaryKey;autoIncrement"`
	UserID       string    `gorm:"not null"`
	PromoteUsers bool      `gorm:"default:false"`
	RemoveUsers  bool      `gorm:"default:false"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime"`
	// Relations
	User User `gorm:"foreignKey:UserID"`
}
