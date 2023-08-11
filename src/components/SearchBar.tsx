import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

type SearchBarProps = {
  onSearch: (searchVal: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
      <FormControl
        placeholder="Search movies..."
        value={query}
        onChange={handleSearch}
        type="search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
