import { Box, Button, Alert, Snackbar, Slide, Typography } from "@mui/material";
// import { TransitionProps } from "@material-ui/core/transitions";
import "./App.css";
import React from "react";

//type TransitionProps = Omit<SlideProps, "direction">;

const [hoveredBox, setHoveredBox] = React.useState<number | null>(null);

interface AppProps {
  dayVar: string;
  monthVar: string;
  dateVar: string;
  timeVar: string;
  hoverTransition: string;
}

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    day: now.toLocaleDateString(),
    month: now.toLocaleDateString("default", { month: "long" }),
    date: now.getDate(),
    time: now.toLocaleTimeString(),
  };
};

const typographyStyle = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 400,
  fontSize: "0.875rem",
  lineHeight: 1.43,
  letterSpacing: "0.01071em",
  justifyContent: "left !important",
};

const AlertContent: React.FC<{
  hoverTransition?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({
  hoverTransition,
  dynamicMarginMultiplier = 0,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const dynamicMarginBottom = 27 * dynamicMarginMultiplier;
  const hoverMargin = 2;
  const dynamicMarginBottom = 27 * (dynamicMarginMultiplier - 1);

  // const calculateMargin = () => {
  //   const hoverMargin = 2;

  //   if(!isHovered) {
  //     return dynamicMarginBottom;
  //   }

  //   if(dynamicMarginBottom ===27) {
  //     return
  //   }
  // }

  return (
    <Alert
      sx={{
        width: "100%",

        boxShadow: " 0 2px 10px rgba(0, 0.3, 0, 0.3)",
        display: "flex-start !important",
        justifyContent: "left",
        justifyItems: "flex-start",
        alignItems: "flex-start !important",
        transition: `transform 0.3s ease-in-out 
        ${hoverTransition || ""}`,
        // opacity: index === 0 ? 1 : 0.8,
        // transform: `translateY(${index * 10}px)`,
        "&:hover": {
          transform: "scale(1.05)",
          // marginBottom: 0,
          marginTop: 0,
          marginBottom: dynamicMarginBottom,
        },
        // marginBottom: 2,
        marginBottom:
          dynamicMarginBottom !== undefined ? -dynamicMarginBottom : 2,
        marginLeft: 2,
        zIndex: 0 ? 1 : 0,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave();
      }}
    >
      <Typography sx={typographyStyle}>Event has been created!</Typography>
      <Typography sx={typographyStyle}>
        {getCurrentDateTime().day}, {getCurrentDateTime().month},{" "}
        {getCurrentDateTime().date} at {getCurrentDateTime().time}
      </Typography>
    </Alert>
  );
};

function App({ dayVar, monthVar, dateVar, timeVar }: AppProps) {
  //   const Transition = React.forwardRef(function Transition(props, ref) {
  //     return <Alert elevation={6} variant="filled" {...props} ref={ref} />;
  //   });

  //   const SlideTransition = (props: SlideProps) => {
  //   return <Slide {...props} direction="up" />;
  // }

  // const [transition, setTransition] = React.useState(false);

  const [hoveredBox, setHoveredBox] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    // setTransition(() => true);
    setOpen(true);
  };

  const getDynamicMargin = (boxNumber: number): number => {
    if (hoveredBox === boxNumber) {
      return boxNumber === 0 ? 0 : 27 * (boxNumber - 1);
    }
    return 0;
  };
  // boxnumber 1,2,3 if hoveredbox = boxnumber

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const [hours, minutes] = timeVar.split(":");
  // const formattedTime = new Date(1970, 0, 1, hours, minutes).toLocaleTimeString(
  //   [],
  //   {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   }
  // );

  return (
    <div>
      <Box>
        <Button onClick={handleClick}>Create Event</Button>
        <Snackbar
          open={open}
          // autoHideDuration={6000}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
          onClose={handleClose}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              marginBottom: 2,
            }}
          >
            <Alert
              severity="success"
              sx={{
                width: "100%",
                marginBottom: 2,
                boxShadow: " 0 2px 10px rgba(0, 0.3, 0, 0.3)",
                alignItems: "center",
                height: "56px",
                transition: "transform 0.5s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  marginBottom: getDynamicMargin(1),
                },
                zIndex: hoveredBox === 1 ? 1 : 0,
              }}
              onMouseEnter={() => setHoveredBox(1)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              Event has been created!
            </Alert>

            <AlertContent
              hoverTransition="0.5s ease-in-out"
              dynamicMarginBottom={}
            />
            {/* 

            then orginial margins as well
            default first scenario of scaling when on first box
            
            1st scenario when hoevered on 2nd
            box1 : marginBottom:'27px' //when hovered
            box2 : marginBottom:'0px'
            box3 : marginBottom : '2px'

            2nd Scenario
            box1 : marginBottom:'27*2 +2px' //when hovered on 3rd
            box2 : marginBottom:'27 + 2px'
            box3 : marginBottom : '2px'


            3rd Scenario
            box1 : marginBottom:'27px' //when hovered
            box2 : marginBottom:'0px'
            box3 : marginBottom : '2px'

             */}
            <AlertContent
              hoverTransition="0.8s ease-in-out"
              dynamicMarginBottom={}
            />
          </Box>
        </Snackbar>
      </Box>
    </div>
  );
}

export default App;
