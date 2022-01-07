package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Item struct {
	Id     string `json:"id"`
	Task   string `json:"task"`
	Done   bool   `json:"done"`
	Date   string `json:"date"`
	Colour string `json:"colour"`
	Info   string `json:"info"`
}

var Items []Item

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func fetchAll(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint: fetch")
	json.NewEncoder(w).Encode(Items)
}

func addTask(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var newItem Item
	json.Unmarshal(reqBody, &newItem)
	Items = append(Items, newItem)
	fmt.Fprintf(w, "%+v", string(reqBody))
}

func removeTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for index, item := range Items {
		if item.Id == id {
			Items = append(Items[:index], Items[index+1:]...)
		}
	}

}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage)
	router.HandleFunc("/fetch", fetchAll)
	router.HandleFunc("/addTask", addTask).Methods("POST")
	router.HandleFunc("/removeTask/{id}", removeTask).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":10000", router))
}

func main() {
	fmt.Println("Rest API v2.0 - Mux Routers")
	Items = []Item{
		Item{Id: "1", Task: "Test1", Done: true},
		Item{Id: "2", Task: "Test2", Done: false},
	}
	handleRequests()
}
