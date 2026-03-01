import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Box, HStack } from "styled-system/jsx";
import { Button, Heading } from "@/components/ui";
import { logoutFn$ } from "@/features/auth.functions";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const logout = useServerFn(logoutFn$);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box w="full">
      <Box
        as="nav"
        width="full"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <HStack
          maxWidth="1100px"
          px="4"
          margin="auto"
          h="64px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="p" textStyle="lg" fontWeight="bold">
            Todo Tantstack
          </Heading>
          <Button onClick={handleLogout}>Logout</Button>
        </HStack>
      </Box>

      <Box maxWidth="1100px" margin="auto" px="4">
        <Outlet />
      </Box>
    </Box>
  );
}
