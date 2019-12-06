import { useState, useCallback, useRef } from "react";
// import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

import api from "../lib/api";

// const Option = Select.option;

function SearchUser({ onChange, value }) {
  // ｛current: 0｝
  const lastFetchIdRef = useRef(0);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchUser = useCallback(
    debounce(value => {
      console.log("value user", value);

      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      setFetching(true);
      setOptions([]);

      api
        .request({
          url: `/search/users?q=${value}`
        })
        .then(resp => {
          console.log("user", resp);
          if (fetchId !== lastFetchIdRef.current) {
            return;
          }
          const data = resp.data.items.map(user => ({
            text: user.login,
            value: user.login
          }));

          setFetching(false);
          setOptions(data);
        });
    }, 500),
    []
  );

  const handleChange = value => {
    setOptions([]);
    setFetching(false);
    onChange(value);
  };

  return (
    // <Select
    //   showSearch={true}
    //   notFoundContent={fetching ? <Spin size="small" /> : <span>Nothing</span>}
    //   filterOption={false}
    //   placeholder="创建者"
    //   onSearch={fetchUser}
    //   onChange={handleChange}
    //   value={value}
    //   allowClear={true}
    // >
    //   {options.map(op => (
    //     <Option value={op.value} key={op.value}>
    //       {op.text}
    //     </Option>
    //   ))}
    // </Select>
    <div>
      <select onChange={handleChange} value={value} style={{ width: 200 }}>
        {options.map(op => (
          <option value={op.value} key={op.value}>
            {op.text}
          </option>
        ))}
      </select>
      <input onChange={fetchUser} />
    </div>
  );
}

export default SearchUser;
