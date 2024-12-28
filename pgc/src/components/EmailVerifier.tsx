import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface EmailVerifierProps {
    code: string;
  }

  export function EmailVerifier( 
    { code }: EmailVerifierProps ) {
    <Html>
        <Text>{ code }</Text>
    </Html>
  }