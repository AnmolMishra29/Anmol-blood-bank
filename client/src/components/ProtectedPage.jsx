import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  //const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    currentUser && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3 mx-3">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-2xl">ANMOL BLOOD BANK</h1>
            <span className="text-xs">
              {currentUser.userType.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <i class="ri-shield-user-line"></i>
            <div className="flex flex-col">
              <span
                className="mr-5 text-md cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getLoggedInUserName(currentUser).toUpperCase()}
              </span>
            </div>

            <i
              className="ri-logout-circle-line ml-5 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* body */}
        <div className="px-5 py-2">{children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
