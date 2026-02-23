import { useState } from "react";
import Counter from "./components/counter";
import "./App.css";

export default function App() {
  return (
    <div className="wrapper">
      <div className="card">
        <Counter />
      </div>
    </div>
  )
}