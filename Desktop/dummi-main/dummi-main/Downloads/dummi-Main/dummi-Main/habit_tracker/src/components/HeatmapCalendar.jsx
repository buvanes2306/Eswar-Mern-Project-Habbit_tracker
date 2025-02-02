import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { format } from 'date-fns';

const HeatmapCalendar = ({ data }) => {
  const from = format(new Date().setMonth(new Date().getMonth() - 6), 'yyyy-MM-dd');
  const to = format(new Date(), 'yyyy-MM-dd');

  return (
    <div style={{ height: '200px' }}>
      <ResponsiveCalendar
        data={data}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
    </div>
  );
};

export default HeatmapCalendar;
