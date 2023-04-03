import Layout from '../layouts/main';
import UserView from '../components/user/index';

import prisma from "../lib/prisma";
import type { GetServerSideProps } from "next";
import { User } from '@prisma/client';
import { Flex, Text } from '@chakra-ui/react';


export const getServerSideProps: GetServerSideProps = async () => {
  const user = await prisma.user.findMany();

  return {
    props: { user }

  };
};

type Props = {
  user: User[];
};

  const IndexPage: React.FC<Props> = (user) => {
 
  return (
    <Flex>

    </Flex>
    
  
  )
}


export default IndexPage

