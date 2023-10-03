"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
import moment from "moment";

export default function Dashboard({ user }: { user: User }) {
  return (
    <div className="container">
      <Card className="mt-4 p-4 flex flex-col border-slate-400">
        <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
          <p className="font-bold text-4xl">user profile.</p>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4">
            <img src={user.image} className="rounded-2xl shadow-lg" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-2xl">Name: {user.name}</h4>
                <p className="font-bold text-xl text-default-500">
                  Bio: {user.bio}
                </p>
                <p className="font-bold text-xl text-default-500">
                  Email: {user.email}
                </p>
                <p className="font-bold text-xl text-default-500">
                  Registration Date:{" "}
                  {moment(user.createdAt).format("DD MMMM, YYYY")}
                </p>
              </div>
              <div className="border flex flex-col gap-2 p-4 rounded-xl mt-4 border-slate-400/50">
                <h4 className="font-bold text-xl">Favorited Movies Count: {user.bio}</h4>
                {/* <p className="font-bold text-lg text-default-500">
                  Bio: {user.bio}
                </p>
                <p className="font-bold text-lg text-default-500">
                  Email: {user.email}
                </p>
                <p className="font-bold text-lg text-default-500">
                  Registration Date:{" "}
                  {moment(user.createdAt).format("DD MMMM, YYYY")}
                </p> */}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
