import {
  Divider,
  FormControl,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Select,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'
import { GoBackButton, PrimaryButton } from 'components/Shared'
import { FiCreditCard, FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from 'slices/cartSlice'

const Cart = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const emptyCart = cart.length === 0

  const handleCheckout = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        <GridItem colSpan={[12, 8]}>
          <GoBackButton to='/' label='Continue Shopping' />
          <Stack spacing={3} divider={<Divider />}>
            <Heading as='h1' size='lg'>
              Shopping Cart
            </Heading>
            {emptyCart && (
              <Text color='gray.500'>Your shopping cart is empty</Text>
            )}
            {cart.map((item) => (
              <Grid
                key={item._id}
                templateColumns='repeat(12, 1fr)'
                gap={6}
                alignItems='center'
              >
                <GridItem colSpan={[5, 2]} justifySelf='center'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize='80px'
                      fit='cover'
                      borderRadius='full'
                      boxShadow='base'
                      ignoreFallback
                    />
                  )}
                </GridItem>
                <GridItem colSpan={[5, 3]}>
                  <Text fontWeight='semibold'>{item.name}</Text>
                </GridItem>
                <GridItem colSpan={[5, 2]}>
                  <FormControl>
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addItem({ ...item, qty: Number(e.target.value) })
                        )
                      }
                    >
                      {[...Array(item?.stockCount).keys()].map((o) => (
                        <option key={o + 1} value={o + 1}>
                          {o + 1}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={[4, 2]} justifySelf='flex-end'>
                  <Text>${item.price}</Text>
                </GridItem>
                <GridItem colSpan={[1, 2]} justifySelf='flex-end'>
                  <IconButton
                    aria-label='Remove item from cart'
                    icon={<FiTrash />}
                    variant='ghost'
                    colorScheme='red'
                    onClick={() => dispatch(removeItem(item._id))}
                  />
                </GridItem>
              </Grid>
            ))}
          </Stack>
        </GridItem>
        <GridItem colSpan={[12, 12, 4]}>
          <Stack spacing={3} boxShadow='base' p={3} borderRadius='base'>
            <Stat>
              <StatLabel>Subtotal</StatLabel>
              <StatNumber>
                $
                {cart
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </StatNumber>
              <StatHelpText>
                {cart.reduce((acc, item) => acc + item.qty, 0)} items
              </StatHelpText>
            </Stat>
            <PrimaryButton
              label='Proceed to Checkout'
              disabled={cart.length === 0}
              onClick={handleCheckout}
              rightIcon={<FiCreditCard />}
              mt={3}
              w='100%'
            />
          </Stack>
        </GridItem>
      </Grid>
    </>
  )
}

export default Cart
