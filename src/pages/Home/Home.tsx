import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import { addDoc } from 'firebase/firestore';
import clsx from 'clsx';
import useUniqueComponentId from '../../Hooks/useUniqueComponentId';
import OptionInput from './components/OptionInput';
import { OptionType } from './types';
import { PlusIcon, SparkleIcon } from '../../assets/Icons';

// import { pollsRef } from '../../firebase';
import validateString from '../../utils/validateString';

const Home = () => {
  const getId = useUniqueComponentId();
  const [options, setOptions] = useState<OptionType[]>([
    { id: getId(), input: '' },
    { id: getId(), input: '' },
  ]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [formError, setFormError] = useState(false);

  const createPoll = async () => {
    // const data = {
    //   options: options.map((option) => ({ title: option.input, votes: 0 })),
    //   question: pollQuestion,
    //   totalVotes: 0,
    // };

    // const docRef = await addDoc(pollsRef, data);
    // return docRef;
    const userInput = [pollQuestion.trim(), ...options.map((o) => o.input.trim())];
    if (!validateString(...userInput)) {
      setFormError(true);
    }
  };

  const handleChange = (val: string, id: number) => {
    setOptions((o) =>
      o.map((option) => (option.id === id ? { ...option, input: val } : option)),
    );
  };

  const handleDelete = (id: number) => {
    setOptions((o) => o.filter((option) => option.id !== id));
  };

  const addOption = () => {
    setOptions((o) => [...o, { id: getId(), input: '' }]);
  };

  return (
    <div className="bg-gray-100 flex-1">
      <div className="p-4 sm:p-9 w-full md:max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-3 text-gray-700">
            Create Poll{' '}
            <span role="img" aria-label="emoji">
              💡
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Complete below fields to create a Poll
          </p>
        </div>

        <section className="my-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-500 mb-3">Poll Question</h3>
            <textarea
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              name="questions"
              className={clsx(
                'w-full p-4 text-lg font-medium text-gray-700 focus:ring-4 ring-purple-300 outline-none rounded-md placeholder-gray-300 border resize-none',
                { '!ring-4 !ring-red-300': formError && !pollQuestion.trim() },
              )}
              placeholder="Which is your favorite Programming Language?"
            />
            {formError && !pollQuestion.trim() && (
              <span className="!mt-0 text-sm text-red-400 font-medium">
                This field can&#39;t be empty
              </span>
            )}
          </div>

          <div>
            <AnimatePresence>
              {options.map((option, idx) => (
                <OptionInput
                  key={option.id}
                  value={option.input}
                  optionNumber={idx + 1}
                  onChange={(val) => handleChange(val, option.id)}
                  onDelete={() => handleDelete(option.id)}
                  showDeleteBtn={options.length > 2}
                  error={formError}
                />
              ))}
            </AnimatePresence>
            <motion.div layout className="mt-5 flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={addOption}
                className="bg-dankPurple px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90">
                <span>Add Another Option</span>
                <PlusIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={createPoll}
                className="bg-green-500 px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90">
                <span>Create Your Poll</span>
                <SparkleIcon className="h-5 w-5 text-yellow-300" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
