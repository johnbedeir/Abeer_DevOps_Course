package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Define a handler function for the root route "/"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, World!")
	})

	// Start the server on port 5000
	fmt.Println("Starting server on http://localhost:5000...")
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
