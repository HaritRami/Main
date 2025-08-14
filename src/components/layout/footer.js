import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-primary text-white py-3 mt-auto">
      <Container className="text-center">
        &copy; {new Date().getFullYear()} WheelSpace - Park Smarter
      </Container>
    </footer>
  );
}

export default Footer;
