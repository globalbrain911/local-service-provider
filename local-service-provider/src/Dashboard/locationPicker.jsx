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
      classNames={{
        control: () => ` rounded-lg px-2 min-w-40 min-h-[44px] bg-background`,
        indicatorSeparator: () => "hidden",
      }}
      options={options}
      onChange={handleChange}
      placeholder="Choose city"
      isClearable
    />
  );
}

export default LocationPicker;
