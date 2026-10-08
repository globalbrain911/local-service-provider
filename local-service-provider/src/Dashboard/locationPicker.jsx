import Select from "react-select";
import { useState, useEffect } from "react";
import { supabase } from "../assets/supabase-client";

function LocationPicker({ onSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    supabase
      .from("locations")
      .select("id, name, latitude, longitude")
      .then(({ data }) => {
        setOptions(
          (data ?? []).map((l) => ({
            value: l.id,
            label: l.name,
            latitude: l.latitude,
            longitude: l.longitude,
          })),
        );
      });
  }, []);

  const handleChange = (choice) => {
    onSelect(choice); // send the picked location back up to the parent
  };

  return (
    <Select
      unstyled
      options={options}
      onChange={handleChange}
      placeholder="Choose city"
      isClearable
      classNames={{
        control: (state) =>
          `flex items-center h-full rounded-lg border px-2 bg-background transition-colors ${
            state.isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-input hover:border-primary/50"
          }`,
        valueContainer: () => "gap-1 px-1",
        placeholder: () => "text-muted-foreground",
        singleValue: () => "text-foreground",
        input: () => "text-foreground",
        indicatorsContainer: () => "gap-1",
        clearIndicator: () =>
          "p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer",
        dropdownIndicator: () =>
          "p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer",
        indicatorSeparator: () => "hidden",
        menu: () =>
          "mt-1 rounded-lg border bg-popover max-h-50 bg-white text-popover-foreground shadow-md overflow-hidden",
        menuList: () => "p-1",
        option: (state) =>
          `px-3 py-2 rounded-md text-sm cursor-pointer ${
            state.isSelected
              ? "bg-primary text-primary-foreground"
              : state.isFocused
                ? "bg-accent text-accent-foreground"
                : ""
          }`,
        noOptionsMessage: () => "px-3 py-2 text-sm text-muted-foreground",
      }}
    />
  );
}

export default LocationPicker;
