import React, { useEffect, useState } from "react";
import "./App.css";

import GuestList from "./GuestList";
import Counter from "./Counter";
import axios from "axios";

export default function App() {
  const [guests, setGuests] = useState([]);
  const [pendingGuest, setPendingGuest] = useState();
  const [numberAttending, setNumberAttending] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8000/guests").then((res) => {
      if (res.data) setGuests(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("Guests ", guests);
    setNumberAttending(guests.length);
  }, [guests]);

  const handleInput = (e) => {
    setPendingGuest(e.target.value);
  };

  const addNewGuest = (e) => {
    e.preventDefault();
    const newGuest = {
      name: pendingGuest,
      confirmed: true,
    };
    axios
      .post(
        "https://salty-castle-35579-3ba34b2e2783.herokuapp.com/guest",
        newGuest
      )
      .then((res) => {
        newGuest["_id"] = res.data["InsertedID"];
        setGuests([...guests, newGuest]);
      });
  };

  const toggleEditingAt = (index) => {
    toggleGuestPropertyAt("isEditing", index);
  };

  const toggleGuestPropertyAt = (property, indexToChange) => {
    setGuests(
      guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property],
          };
        }
        return guest;
      })
    );
  };

  const setNameAt = (name, indexToChange) => {
    this.setGuests(
      guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name,
          };
        }
        return guest;
      })
    );
  };

  const removeGuestAt = (index) => {
    axios
      .delete(
        `https://salty-castle-35579-3ba34b2e2783.herokuapp.com//guest/${guests[index]._id}`
      )
      .then((r) => console.log(r))
      .catch((res) => {
        console.log("Res: ", res);
      });
    setGuests([
      ...guests.slice(0, index), //Spread operator
      ...guests.slice(index + 1),
    ]);
  };

  return (
    <div className="App">
      <header>
        <h1>Yaz and Alex's Halloween Party</h1>
        <form onSubmit={addNewGuest}>
          <input
            type="text"
            onChange={handleInput}
            value={pendingGuest}
            placeholder="RSVP.."
          />
          <button type="submit" name="submit" value="submit">
            Submit
          </button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
        </div>
        <Counter numberAttending={numberAttending} />
        <GuestList
          guests={guests}
          toggleEditingAt={toggleEditingAt}
          setNameAt={setNameAt}
          removeGuestAt={removeGuestAt}
        />
      </div>
    </div>
  );
}
