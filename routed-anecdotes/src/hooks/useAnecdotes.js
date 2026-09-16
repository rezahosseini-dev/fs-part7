import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => {
      setAnecdotes(data);
    });
  }, []);

  const addAnecdote = async (newObject) => {
    const savedAnecdote = await anecdoteService.createNew(newObject);
    setAnecdotes(anecdotes.concat(savedAnecdote));
  };

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id);
    setAnecdotes(anecdotes.filter((a) => a.id !== id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
