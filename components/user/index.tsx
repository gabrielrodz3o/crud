import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Flex,
  useToast,
  IconButton,
  Text,
  Spacer,
} from "@chakra-ui/react";

import React from "react";

import { User } from "../../types/user";
type Props = {
  user: User[];
  onClick: () => void;
};

const Users: React.FC<Props> = (user) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingUser, setEditingUser] = useState<User | null>({
    id:undefined,
    nombre: "",
    username: "",
    password: "",
  });

  const [Users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(user.user);
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    onOpen();
  };

  const Onclean = () => {
    setEditingUser({
      id: undefined, // provide a default id
      nombre: "",
      username: "",
      password: "",
    });
  };
  async function handleSubmit() {
    try {
      fetch("api/user", {
        body: JSON.stringify(editingUser),
        headers: {
          "Content-Type": "application/json",
        },
        method: editingUser?.id === undefined ? "POST" : "PUT",
      }).then(async (data) => {
        if (data.status == 200) {
          user.onClick();
          onClose();
          Onclean();
          toast({
            title: editingUser?.id === null ? "User create" : "User update",
            description: "",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error ." + data.statusText,
            description: "",
            status: "error",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      toast({
        title: "Error ." + error,
        description: "",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  const handleDelete = (userToDelete: User) => {
    try {
      fetch("api/user", {
        body: JSON.stringify(userToDelete),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(async (data) => {
        if (data.status == 200) {
          user.onClick();
          onClose();
          Onclean();
          toast({
            title: "Elminado",
            description: "",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      toast({
        title: "Error ." + error,
        description: "",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        marginRight={5}
        marginTop={5}
      >
        <Text marginLeft={5} fontSize="2xl" fontWeight="bold">
          Total de usuario. {Users.length}
        </Text>
        <Spacer />
        <Button
          alignItems="center"
          justifyContent="end"
          colorScheme="blue"
          mr={3}
          onClick={() => {
            Onclean(), onOpen();
          }}
        >
          Nuevo Usuario
        </Button>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Users.map((User: User) => (
            <Tr key={User.id}>
              <Td>{User.nombre}</Td>
              <Td>{User.username}</Td>
              <Td>{User.password}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleEdit(User)}
                >
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(User)}>
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingUser?.id === null ? "Nuevo usuario" : "Editar usuario"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={editingUser?.nombre}
                onChange={(e) => {
                  setEditingUser((prevUser) => ({
                    ...prevUser!,
                    nombre: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={editingUser?.username}
                onChange={(e) => {
                  setEditingUser((prevUser) => ({
                    ...prevUser!,
                    username: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={editingUser?.password}
                onChange={(e) => {
                  setEditingUser((prevUser) => ({
                    ...prevUser!,
                    password: e.target.value,
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              // onClick={() => {
              //   if (editingUser != null) {
              //     handleUpdate(editingUser);
              //   }
              // }}
            >
              {editingUser?.id === null ? "Guardar" : "Actualizar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Users;
