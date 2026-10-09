// components/ServiceSearchSelect.jsx
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/assets/supabase-client"; // change to your path

export default function ServiceSearchSelect({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(""); // NEW: tracks what the user typed

  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name")
        .order("name");

      if (!error && data) {
        setOptions(data.map((s) => ({ value: s.id, label: s.name })));
      }
      setLoading(false);
    };
    loadServices();
  }, []);

  // NEW: filter by what was typed, with "starts with" matches first
  const visibleOptions = useMemo(() => {
    const term = inputValue.trim().toLowerCase();
    if (!term) return [];

    const startsWith = [];
    const contains = [];

    options.forEach((opt) => {
      const label = opt.label.toLowerCase();
      if (label.startsWith(term)) startsWith.push(opt);
      else if (label.includes(term)) contains.push(opt);
    });

    return [...startsWith, ...contains];
  }, [options, inputValue]);

  return (
    <>
      <div className="hover:cursor-text px-10">
        <Select
          options={visibleOptions}
          filterOption={null}
          isLoading={loading}
          value={value}
          onChange={onChange}
          onInputChange={(text) => setInputValue(text)} // NEW
          menuIsOpen={inputValue.trim().length > 0} // NEW: list shows only after typing
          openMenuOnClick={false} // NEW
          openMenuOnFocus={false} // NEW
          components={{ DropdownIndicator: null, IndicatorSeparator: null }} // NEW: hides the arrow
          placeholder="Search for a service (e.g. Plumbing)"
          noOptionsMessage={() => "No matching service found"}
          isClearable
          isSearchable
          unstyled
          classNames={{
            control: ({ isFocused }) =>
              `min-h-[52px] px-5 bg-white border rounded-3xl text-base w-full md:w-130  ${
                isFocused
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-black"
              }`,
            placeholder: () => "text-gray-400 font-mono px-1 truncate",
            input: () => "text-gray-900",
            menu: () =>
              "mt-3 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden",
            option: ({ isFocused, isSelected }) =>
              `px-4 py-3 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : isFocused
                    ? "bg-blue-50"
                    : ""
              }`,
            noOptionsMessage: () => "px-4 py-3 text-gray-500",
            clearIndicator: () => "p-1 text-gray-400 hover:text-gray-600",
          }}
        />
      </div>
    </>
  );
}
