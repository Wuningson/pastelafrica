import { CopyIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  ChakraProvider,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortenApiService from './api/ShortenApi';
import { removeAlert, alert } from './reducers/AlertReducer';
import { setLoading } from './reducers/LoadingReducer';
import { RootState } from './utils/store';

function App() {
  const loading = useSelector((state: RootState) => state.loading);
  const alerts = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const [shortenedUrl, setShortenedUrl] = useState('');

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const dismissAlert = (id: string) => (e: any) => {
    dispatch(removeAlert(id));
  };

  const handleCopy = () => navigator.clipboard.writeText(shortenedUrl);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!url) {
        return alert(
          { type: 'warning', message: 'Please enter the url' },
          dispatch
        );
      }
      if (!isValidUrl(url)) {
        return alert(
          { message: 'Please enter a valid url', type: 'warning' },
          dispatch
        );
      }

      dispatch(setLoading(true));
      setShortenedUrl('');

      const { data } = await ShortenApiService.shortenUrl({ url });

      setUrl('');
      setShortenedUrl(data.url);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return alert(
          {
            type: 'error',
            message:
              (err.response?.data as any)?.message || 'Something went wrong'
          },
          dispatch
        );
      }
      return alert(
        { type: 'error', message: 'Something went wrong' },
        dispatch
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <ChakraProvider>
      <div className='App'>
        <Center>
          <Box w='80%' borderWidth='1px' borderRadius='lg' marginTop='4em'>
            <VStack>
              <Center marginTop='2em' marginBottom='2em'>
                <header className='App-header'>
                  <Heading>URL Shortener</Heading>
                </header>
              </Center>

              {shortenedUrl ? (
                <>
                  <HStack height='3em'>
                    <Text fontSize='md' color='#9ad1d4' marginRight='2em'>
                      {shortenedUrl}
                    </Text>
                    <IconButton
                      aria-label='Copy Url'
                      icon={<CopyIcon />}
                      onClick={handleCopy}
                    />
                  </HStack>
                </>
              ) : null}

              {alerts.map(({ id, type, message }) => (
                <Alert key={id} status={type} onClick={dismissAlert(id!)}>
                  <AlertIcon color='white' />
                  {message}
                </Alert>
              ))}

              <form onSubmit={handleSubmit}>
                <label htmlFor='url'>Enter url:</label>
                <Input
                  id='url'
                  placeholder='https://www.google.com'
                  size='lg'
                  value={url}
                  onChange={handleChange}
                  marginTop='1em'
                />

                <Button
                  type='submit'
                  disabled={loading}
                  marginTop='2em'
                  marginBottom='2em'
                >
                  {loading ? (
                    <Spinner color='#120c4b' emptyColor='gray.200' />
                  ) : (
                    'Shorten Url'
                  )}
                </Button>
              </form>
            </VStack>
          </Box>
        </Center>
      </div>
    </ChakraProvider>
  );
}

export default App;
