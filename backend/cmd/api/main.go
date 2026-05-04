package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Post struct {
	ID int `json:"id"`
	Content string `json:"content"`
	Ahthor string `json:"ahthor"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "DELETE", "PUT"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	r.GET("api/posts", func (c *gin.Context)  {
		posts := []Post{
			{ID: 1, Content: "Gin is great stack!", Ahthor: "Alice"},
			{ID: 2, Content: "Clone Project started", Ahthor: "Bob"},
		}

		c.JSON(http.StatusOK, posts)
	}) 

	r.Run(":8080")
}