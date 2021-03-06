import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MinimizeIcon from '@mui/icons-material/Minimize';
import IconButton from '@mui/material/IconButton';
import useSocket from 'context/socket';
import useAuth from 'context/auth';
import initialToColor from 'components/InitialToColor';
import { getConversation } from 'chat/api/chatApi';

export default function ChatWidget({ friendInfo, handleCloseChat }) {
  const { socket } = useSocket();
  const [conversation, setConversation] = useState();
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  const endRef = useRef();

  useEffect(() => {
    getConversation(friendInfo._id).then((data) => setConversation(data));
  }, [friendInfo._id]);

  useEffect(() => {
    socket.on('private message', (msg) => {
      if (msg.from === friendInfo._id || msg.from === user._id) {
        setConversation((conversation) => [...conversation, msg]);
      }
    });
    return () => {
      socket.off('privat message');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleMessage = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (socket, to, msg) => {
    if (msg.length > 0) {
      socket.emit('private message', { msg: msg, to: to });
      setMsg('');
    }
  };

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  return (
    <Draggable bounds="body" handle="#handle">
      <Box
        sx={{
          zIndex: 9999,
          position: 'absolute',
          cursor: 'auto',
          userSelect: 'text',
          color: 'white',
          backgroundColor: 'black',
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Stack spacing={1} divider={<Divider flexItem />}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', cursor: 'move' }}
            id="handle"
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: initialToColor(
                  `${friendInfo.first[0]}${friendInfo.last[0]}`
                ),
              }}
              src={friendInfo.profileImg}
            >
              <Typography>{`${friendInfo.first[0]}${friendInfo.last[0]}`}</Typography>
            </Avatar>
            <Typography>{`${friendInfo.first} ${friendInfo.last}`}</Typography>
            <IconButton
              sx={{ color: 'inherit' }}
              onClick={() => handleCloseChat(friendInfo)}
            >
              <MinimizeIcon style={{ transform: 'rotate(0.5turn)' }} />
            </IconButton>
          </Stack>

          <Box
            style={{
              maxHeight: 500,
              overflow: 'auto',
            }}
            sx={{
              height: '300px',
              width: '250px',
              p: 1,
              textAlign: 'start',
            }}
          >
            {conversation &&
              conversation.map((m) => (
                <Box key={m._id}>
                  {m.from === friendInfo._id ? (
                    <Box>
                      <Stack direction="row" alignItems={'center'}>
                        <Avatar
                          sx={{
                            width: 25,
                            height: 25,
                            mr: 1,
                            backgroundColor: initialToColor(
                              `${friendInfo.first[0]}${friendInfo.last[0]}`
                            ),
                          }}
                          src={friendInfo.profileImg}
                        >
                          <Typography>{`${friendInfo.first[0]}${friendInfo.last[0]}`}</Typography>
                        </Avatar>
                        <strong>{`${friendInfo.first} ${friendInfo.last}`}</strong>
                      </Stack>
                      <Typography sx={{ mb: 1, ml: 4 }}>{m.message}</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'end' }}>
                      <Stack
                        direction={'row'}
                        justifyContent="flex-end"
                        alignItems={'center'}
                      >
                        <Typography>
                          <strong>{`${user.first} ${user.last}`}</strong>
                        </Typography>
                        <Avatar
                          sx={{
                            width: 25,
                            height: 25,
                            ml: 1,
                            backgroundColor: initialToColor(
                              `${user.first[0]}${user.last[0]}`
                            ),
                          }}
                          src={user.profileImg}
                        >
                          <Typography>{`${user.first[0]}${user.last[0]}`}</Typography>
                        </Avatar>
                      </Stack>
                      <Typography sx={{ mb: 1, mr: 4 }}>{m.message}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            <div ref={endRef} />
          </Box>

          <Stack direction="row">
            <TextField
              sx={{
                border: '1px solid white',
                '& .MuiInputBase-input': {
                  color: 'white',
                  p: 1,
                },
              }}
              label={null}
              fullWidth
              variant="outlined"
              value={msg}
              onChange={handleMessage}
            />
            <Button
              sx={{
                color: 'white',
                p: 0,
                ml: 1,
                ':hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
              onClick={() => handleSendMessage(socket, friendInfo._id, msg)}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Draggable>
  );
}
