import { Redirect } from "react-router-dom";
import React from "react";

export default function QuickNavigate(route: string) {
  return <Redirect to={route} />;
}
