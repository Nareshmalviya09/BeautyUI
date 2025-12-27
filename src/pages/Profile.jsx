import React from "react";

const Profile = () => {
  // dummy user (later backend/JWT se aayega)
  const user = {
    name: "Naresh malviya",
    email: "nareshmalviya4321@gmail.com",
    phone: "6260818939",
    status: "ACTIVE",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <div className="mb-4">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold">{user.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-semibold">{user.phone}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-green-600">
            {user.status}
          </p>
        </div>

        <button className="w-full bg-black text-white py-2 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
