"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useFetcher } from "../../hooks/useFetcher";
import { UserCard } from "../../components/UserCard";
import { IUserData } from "../../types/users";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export default function UsersScreen() {
  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [sortedData, setSortedData] = useState<IUserData[]>([]);
  const [sortingOrder, setSortingOrder] = useState<any>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Omit<IUserData, "id">>({
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
  });

  const { data: users, isLoading: usersLoading } = useFetcher<IUserData[]>({
    url: "https://fakestoreapi.com/users",
  });

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const generalFields = ["firstname", "lastname"];

    const addressFields = [
      "zipcode",
      "city",
      "street",
      "number",
      "lat",
      "long",
    ];

    if (generalFields.includes(event.target.name)) {
      setNewUser((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [event.target.name]: event.target.value,
        },
      }));
      return;
    }

    if (addressFields.includes(event.target.name)) {
      if (event.target.name === "lat" || event.target.name === "long") {
        setNewUser((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            geolocation: {
              ...prev.address.geolocation,
              [event.target.name]: event.target.value,
            },
          },
        }));
        return;
      }

      setNewUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [event.target.name]: event.target.value,
        },
      }));
      return;
    }

    setNewUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const rawResponse = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      const response = await rawResponse.json();

      toast.success(`Created user with id ${response.id}.`);
    } catch (error) {
      toast.error("A problem ocurred while creating the user");
    }
  };

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    if (!usersData) return;

    const sorted = usersData.sort((a, b) => {
      if (!sortingOrder) return;

      if (sortingOrder.column === "email") {
        const order = sortingOrder.order === "asc" ? 1 : -1;

        if (a.email < b.email) {
          return -1 * order;
        }
        if (a.email > b.email) {
          return 1 * order;
        }
        return 0;
      }

      if (sortingOrder.order === "asc") {
        return b[sortingOrder.column] - a[sortingOrder.column];
      } else {
        return a[sortingOrder.column] - b[sortingOrder.column];
      }
    });
    setSortedData(sorted);
  }, [usersData, sortingOrder]);

  return (
    <div className="w-full flex items-center justify-center">
      <Modal
        isOpen={isModalOpen}
        size="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Create a new user</ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col gap-[20px]"
              onSubmit={handleFormSubmit}
            >
              <fieldset className="flex flex-col gap-[10px]">
                <legend className="mb-[10px]">General Information</legend>
                <div className="flex gap-[5px]">
                  <Input
                    placeholder="Name"
                    name="firstname"
                    variant="bordered"
                    value={newUser.name.firstname}
                    onChange={handleFormChange}
                  />
                  <Input
                    placeholder="Lastname"
                    name="lastname"
                    variant="bordered"
                    value={newUser.name.lastname}
                    onChange={handleFormChange}
                  />
                </div>
                <Input
                  placeholder="Username"
                  name="username"
                  variant="bordered"
                  value={newUser.username}
                  onChange={handleFormChange}
                />
                <Input
                  type="mail"
                  placeholder="email"
                  name="email"
                  variant="bordered"
                  value={newUser.email}
                  onChange={handleFormChange}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  variant="bordered"
                  value={newUser.password}
                  onChange={handleFormChange}
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  variant="bordered"
                  value={newUser.phone}
                  onChange={handleFormChange}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-[10px]">
                <legend>Address</legend>
                <Input
                  placeholder="City"
                  name="city"
                  variant="bordered"
                  value={newUser.address.city}
                  onChange={handleFormChange}
                />
                <Input
                  placeholder="Street"
                  name="street"
                  variant="bordered"
                  value={newUser.address.street}
                  onChange={handleFormChange}
                />
                <Input
                  placeholder="Number"
                  name="number"
                  variant="bordered"
                  value={String(newUser.address.number)}
                  onChange={handleFormChange}
                />
                <Input
                  placeholder="Zipcode"
                  name="zipcode"
                  variant="bordered"
                  value={newUser.address.zipcode}
                  onChange={handleFormChange}
                />
                <div className="flex gap-[5px]">
                  <Input
                    placeholder="Lat"
                    name="lat"
                    variant="bordered"
                    value={newUser.address.geolocation.lat}
                    onChange={handleFormChange}
                  />
                  <Input
                    placeholder="Long"
                    name="long"
                    variant="bordered"
                    value={newUser.address.geolocation.long}
                    onChange={handleFormChange}
                  />
                </div>
              </fieldset>
              <Button type="submit" color="primary" className="mb-[20px]">
                Create user
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {usersLoading && <Spinner />}
      {usersData && (
        <div className="my-[80px]">
          <div className="mb-[40px]">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-slate-600">You’re now seeing all the users</p>
          </div>
          <div className="mb-[20px] flex justify-between">
            <div className="flex gap-[5px]">
              <Button
                color={
                  sortingOrder && sortingOrder.column === "id"
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  if (!sortingOrder || sortingOrder.id === "email") {
                    setSortingOrder({ column: "id", order: "asc" });
                    return;
                  }

                  setSortingOrder((prev) => {
                    if (prev.order === "asc") {
                      return { column: "id", order: "dsc" };
                    }
                    return { column: "id", order: "asc" };
                  });
                }}
              >
                ID
              </Button>
              <Button
                color={
                  sortingOrder && sortingOrder.column === "email"
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  if (!sortingOrder || sortingOrder.id === "id") {
                    setSortingOrder({ column: "email", order: "asc" });
                    return;
                  }

                  setSortingOrder((prev) => {
                    if (prev.order === "asc") {
                      return { column: "email", order: "dsc" };
                    }
                    return { column: "email", order: "asc" };
                  });
                }}
              >
                Email
              </Button>
            </div>
            <div className="flex gap-[5px]">
              <Button color="primary" onClick={() => setIsModalOpen(true)}>
                Add
              </Button>
              <Button
                onClick={() => {
                  setUsersData(users);
                  setSortingOrder(undefined);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="flex gap-[20px] flex-wrap justify-center">
            {sortedData.map((userData) => (
              <UserCard
                key={userData.id}
                {...userData}
                onDelete={() => {
                  setUsersData((prev) => {
                    const updatedArr = [...prev];
                    const userIndex = updatedArr.findIndex(
                      (item) => item.id === userData.id
                    );
                    updatedArr.splice(userIndex, 1);

                    return updatedArr;
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
