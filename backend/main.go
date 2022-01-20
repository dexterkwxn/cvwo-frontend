package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/go-sql-driver/mysql"
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
var db *sql.DB

func initDB() {
	cfg := mysql.Config{
		User:   os.Getenv("DBUSER"),
		Passwd: os.Getenv("DBPASS"),
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "dexter1",
	}
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

// GET /fetch - fetches all entries from "items" table
func fetchAll(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint: fetch")
	var result []Item

	rows, err := db.Query("SELECT * FROM items")
	if err != nil {
		fmt.Fprintf(w, "fetchAll(): ", err)
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.Id, &item.Task, &item.Done, &item.Date, &item.Colour, &item.Info); err != nil {
			fmt.Fprintf(w, "fetchAll(): ", err)
		}
		result = append(result, item)
	}
	if err := rows.Err(); err != nil {
		fmt.Fprintf(w, "fetchAll(): ", err)
	}
	json.NewEncoder(w).Encode(result)
}

// POST /addTask - adds entry into "items" table
func addTask(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var newItem Item
	json.Unmarshal(reqBody, &newItem)
	Items = append(Items, newItem)

	_, err := db.Exec(
		"INSERT INTO items (task, done, date, colour, info) VALUES (?, ?, ?, ?, ?)",
		newItem.Task,
		newItem.Done,
		newItem.Date,
		newItem.Colour,
		newItem.Info,
	)
	if err != nil {
		fmt.Fprintf(w, "addTask(): ", err)
		return
	}
	fmt.Fprintf(w, "%+v", string(reqBody))
}

// DELETE /removeTask/{id} - delete row with specified id
func removeTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	_, err := db.Exec(
		"DELETE FROM items WHERE id = ?",
		id,
	)
	if err != nil {
		fmt.Fprintf(w, "removeTask(): ", err)
		return
	}
	fmt.Fprintf(w, "%+v", string(id))
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
	initDB()
	fmt.Println("Rest API v2.0 - Mux Routers")
	Items = []Item{
		Item{Id: "1", Task: "Test1", Done: true},
		Item{Id: "2", Task: "Test2", Done: false},
	}
	handleRequests()
}
