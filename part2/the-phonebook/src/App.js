import { useEffect, useState } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import personsServices from "./services/persons"
import Notification from "./components/Notification"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    personsServices
      .getAll()
      .then(response => { setPersons(response) })
  }, [])

  const updatePersonsHandler = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.find((person) => person.name === newName)) {
      const personId = persons.find((person) => person.name === newName).id
      console.log(personId, 423423432)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsServices.update(personId, newPerson).then(response => {
          console.log("updated!", response)
          personsServices.getAll().then(response => {
            setPersons(response)
            setNewName("")
            setNewNumber("")
            setMessage(`Updated ${newName}`)
            setStatus("success")
            setTimeout(() => { setMessage(""); setStatus("") }, 3000)
          })
        })
      }
      return ""
    }
    if (!persons.some((item) => newPerson.name === item.name)) {
      personsServices.create(newPerson)
        .then(response => {
          console.log("Added!", response)
          personsServices
            .getAll()
            .then(response => {
              setPersons(response)
            })
          setNewName("")
          setNewNumber("")
          setMessage(`Added ${newName}`)
          setStatus("success")
          setTimeout(() => { setMessage(""); setStatus("") }, 3000)
        })
        .catch((err) => {
          console.log(err.response.data.error)
          setMessage(`${err.response.data.error}`)
          setStatus("error")
        }
        )
    }
  }

  const deleteHandler = async (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices.remove(id)
        .then(response => {
          personsServices
            .getAll()
            .then(response => {
              setPersons(response)
              console.log("deleted!", response)
              setMessage(`Successfully deleted the infomation of ${name}`)
              setStatus("success")
            })
          setTimeout(() => { setMessage(""); setStatus("") }, 3000)
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
          setMessage(`Information of ${name} has already been removed from server`)
          setStatus("error")
          personsServices
            .getAll()
            .then(response => {
              setPersons(response)
            })
          setTimeout(() => { setMessage(""); setStatus("") }, 3000)
        })

    }
  }



  const filterHandler = (event) => {
    setFilterName(event.target.value)
    console.log("filtered!", event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter filterName={filterName} filterHandler={filterHandler} />
      <h3>add a new</h3>
      <PersonForm
        updatePersonsHandler={updatePersonsHandler}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
