import { createFileRoute } from "@tanstack/react-router";
import { EstateApp } from "@/components/estate/EstateApp";

export const Route = createFileRoute("/")({
  component: EstateApp,
});
