from locust import HttpUser, task, between

class ShoppingCartUser(HttpUser):
    wait_time = between(1, 3)  # Users wait between 1 and 3 seconds between tasks
      
    def on_start(self):
        self.client.headers = {
            'Accept-Language': 'en-US',  # Always request the English (US) locale
        }

    @task
    def view_stores(self):
        self.client.get("/stores")

    @task
    def view_products(self):
        self.client.get("/products")

    @task
    def product_detail(self):
        # Test loading time of a specific product page (product 47)
        self.client.get("/product/47")



    
