import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  Button,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { Carousel } from "@material-tailwind/react";
import { IoSendOutline } from "react-icons/io5";
import { useAppDispatch } from "../lib/hooks";
import { submitComment } from "@/lib/features/blog/blogSlice";

const CommentSection = ({ comments, onAddComment, onClose }) => {
  const [newComment, setNewComment] = useState({ name: "", comment: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const handleAddComment = () => {
    // Check if both name and comment are provided
    if (newComment.name.trim() && newComment.comment.trim()) {
      // Dispatch the submitComment action
      onAddComment(newComment);
      setNewComment({ name: "", comment: "" });
    } else {
      // Handle validation error, e.g., show an alert or toast message
      alert("Please enter both name and comment before submitting.");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {comments.map((comment, index) => (
            <div key={index}>
              <Text fontWeight="bold">{comment.name}</Text>
              <Text>{comment.comment}</Text>
              <Divider />
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Input
              name="name"
              placeholder="Your Name"
              value={newComment.name}
              onChange={handleInputChange}
              mb={2}
            />
            <Textarea
              name="comment"
              placeholder="Your Comment"
              value={newComment.comment}
              onChange={handleInputChange}
              resize="none"
              mb={4}
            />

            <Button
              onClick={handleAddComment}
              flex="1"
              variant="ghost"
              leftIcon={<IoSendOutline />}
            >
              Send
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default function BlogCard({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postComments, setPostComments] = useState(data.comments);
  const dispatch = useAppDispatch();

  const handleAddComment = (newComment) => {
    dispatch(submitComment({ id: data._id, ...newComment }));
    setPostComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <>
      <Card maxW="lg">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="./peace.jpg" />
              <Box>
                <Heading size="sm">Pham Van Duong</Heading>
                <Text>Full Stack Intern</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{data.title}</Text>
          <Text>{data.description}</Text>
        </CardBody>
        <Carousel className="rounded-xl">
          {data?.images?.map((image, index) => {
            const url = image?.url;
            const crop_url = `https://res.cloudinary.com/dynaq6ela/image/upload/c_scale,w_500/${
              url.split("/")[7]
            }`;
            return (
              <img
                key={index}
                src={crop_url}
                alt={`image ${index}`}
                className="h-full w-full object-cover p-2"
              />
            );
          })}
        </Carousel>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiChat />}
            onClick={onOpen}
          >
            View Comments
          </Button>
        </CardFooter>
      </Card>
      {isOpen && (
        <CommentSection
          comments={postComments}
          onAddComment={handleAddComment}
          onClose={onClose}
        />
      )}
    </>
  );
}
