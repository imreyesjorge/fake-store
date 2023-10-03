import { IUserData } from "../../../types/users";

const getUserData = async (id: number) => {
  const rawResponse = await fetch(`https://fakestoreapi.com/users/${id}`);

  const response = await rawResponse.json();

  return response;
};

export default async function UserInfoScreen({ params }) {
  const userData: IUserData = await getUserData(params.id);

  return (
    <div className="w-full mt-[60px] flex flex-col lg:flex-row gap-[30px] my-[60px]">
      <img
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${userData.username}${userData.id}`}
        alt="user profile picture"
        className="w-full lg:w-[200px] h-[200px] rounded-lg object-cover"
      />
      <div className="flex flex-col items-start gap-[30px]">
        <div className="flex flex-col gap-[5px]">
          <small className="text-xs font-medium">{userData.id}</small>
          <h1 className="text-4xl font-bold">
            {userData.name.firstname} {userData.name.lastname}
          </h1>
          <p className="text-slate-600 font-light">@{userData.username}</p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="flex items-center justify-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            {userData.phone}
          </p>
          <p className="flex items-center justify-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {userData.email}
          </p>
        </div>
        <div className="p-6 px-10 rounded-xl bg-slate-900">
          <p>City: {userData.address.city}</p>
          <p>Street: {userData.address.street}</p>
          <p>Number: {userData.address.number}</p>
          <p>zipcode: {userData.address.zipcode}</p>
          <p>
            Geolocation: {userData.address.geolocation.lat},
            {userData.address.geolocation.long}
          </p>
        </div>
      </div>
    </div>
  );
}
