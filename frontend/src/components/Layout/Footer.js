import { Flex, Icon, Link } from '@chakra-ui/react'
import { FiGithub } from 'react-icons/fi'

const Footer = () => {
  return (
    <Flex as='footer' justify='center' align='center' py={3} color='gray.500'>
      <Link
        fontSize='md'
        fontWeight='lighter'
        href='https://github.com/andyols/react-mern-ecommerce'
        isExternal
      >
        <Icon as={FiGithub} mr={1} w={4} h={4} />
        Github
      </Link>
    </Flex>
  )
}

export default Footer
