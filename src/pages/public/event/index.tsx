import { Container, Grid, Pagination, Skeleton } from "@mui/material";
import api from "../../../api";
import { eventsRaw } from "../../../api/event"
import { useDataApi } from "../../../api/hook";
import { IEvent, IEventResponse } from "../../../interfaces/event";
import Space from "../../../components/space";
import SearchInput from "../../../components/search-input";
import { useInput } from "../../../hooks";
import EventCard from "../../../components/event-card";

const Event = () => {

  const events = useDataApi<IEventResponse, IEvent[]>(eventsRaw, api.event.getAll);
  const input = useInput('');

  return (
    <div>
      <Grid container>
        <Grid><Container sx={{width: '100%'}}>
            {events.isLoading 
            ?Array(5).fill(null).map((e, i) => (
            <Skeleton
              key={i}
              animation='wave'
              variant='rounded'
              width='100%'
              height={200}
              style={{
                marginBottom: '10px'
              }}
            />))
            :events.data.map((event, idx) => (
            <EventCard
              key={event.title + idx}
              data={event}
            />
            ))}
            <Space h={'10px'} />
            <Grid display='flex' justifyContent='center'>
              <Pagination count={10} color="secondary" size='large'/>
            </Grid>
            <Space h={'10px'} />
        </Container></Grid>
      </Grid>
    </div>
  )
}

export default Event