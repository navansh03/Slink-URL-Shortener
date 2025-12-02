package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/navansh03/shorten-url-fiber-redis/routes"
)

func setupRoutes(app *fiber.App) {
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/v1", routes.ShortenURL)

}
func main()  {
	err:=godotenv.Load()
	if err!=nil{
		fmt.Println(err)
	}
	app := fiber.New()
	var allowed_url=os.Getenv("ALLOWED_URL")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://localhost:3001, http://localhost:3000, "+allowed_url,
		AllowHeaders:"Origin, Content-Type, Accept",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	app.Use(logger.New())
	setupRoutes(app)
	log.Fatal(app.Listen(os.Getenv("APP_PORT")))
	
}