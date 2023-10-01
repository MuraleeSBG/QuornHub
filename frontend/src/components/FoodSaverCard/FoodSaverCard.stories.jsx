import { FoodSaverCard } from './FoodSaverCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FoodSaverCard',
  component: FoodSaverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: { control: 'text' },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
        tags: ['vegan', 'vegetarian', 'gluten-free'],
        title: 'Vegan Chocolate Chip Cookies',
        image: 'https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1-550x550.jpg',  },
};


