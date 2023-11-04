import { Outlet } from '@modern-js/runtime/router';
import { ChakraProvider } from '@chakra-ui/react';

export default function Layout() {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
}
