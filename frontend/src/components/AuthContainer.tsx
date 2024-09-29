import { Col, Row } from "antd";
import { FC, ReactNode } from "react";
import bgImage from "../assets/bg-shopping.jpg";

const AuthContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Row justify="center" align="middle" style={{ height: "100vh", backgroundImage: `url(${bgImage})` }}>
            <Col style={{ maxWidth: 600, border: "2px solid #4f696339", padding: "30px 20px", borderRadius: "8px", background: "#ffffff" }}>
                {children}
            </Col>
        </Row>
    );
};

export default AuthContainer;
