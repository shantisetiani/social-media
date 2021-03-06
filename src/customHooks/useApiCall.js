import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useApiCall = ({ ApiCall, params, store, storageName }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();
  const storage = useSelector((state) => state[storageName]);

  const getData = () => {
    if (storage && storage.length > 0) {
      setResponse(storage);
      setloading(false);
    } else {
      ApiCall(params)
        .then((response) => {
          if (store) dispatch(store(response.data));
          setResponse(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [storage]);

  return { response, error, loading };
};

export default useApiCall;
