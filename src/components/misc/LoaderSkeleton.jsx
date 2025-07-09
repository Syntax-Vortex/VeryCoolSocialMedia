import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className='w-full md:w-[800px] pb-7'>
                <div className="card w-full h-full">
                    {/* Top bar */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="card__skeleton card__avatar" />
                        <div className="flex flex-col gap-2">
                            <div className="card__skeleton card__username" />
                            <div className="card__skeleton card__timestamp" />
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="card__skeleton card__caption mb-4" />

                    {/* Image Placeholder */}
                    <div className="card__skeleton card__image mb-4" />

                    {/* Icons */}
                    <div className="flex items-center gap-6 mb-4">
                        <div className="card__skeleton card__icon" />
                        <div className="card__skeleton card__icon" />
                    </div>

                    {/* Comment input bar */}
                    <div className="flex items-center justify-between border-t border-[#444] pt-3">
                        <div className="card__skeleton card__input" />
                        <div className="card__skeleton card__button" />
                    </div>
                </div>
            </div>

        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    padding: 1.25rem;
    border-radius: 1rem;
    background: linear-gradient(180deg, #202231, #161821);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.02);
    color: #fff;
  }

  .card__skeleton {
    position: relative;
    overflow: hidden;
    background-color: #2a2a2e;
    border-radius: 0.5rem;

    /* SHIMMER ANIMATION */
    background-image: linear-gradient(
      90deg,
      #2a2a2e 0px,
      rgba(255, 255, 255, 0.05) 40px,
      #2a2a2e 80px
    );
    background-size: 300%;
    animation: shimmer 2s infinite linear;
  }

  /* Avatar */
  .card__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  /* Username + time */
  .card__username {
    width: 120px;
    height: 12px;
  }

  .card__timestamp {
    width: 80px;
    height: 10px;
  }

  /* Caption */
  .card__caption {
    width: 70%;
    height: 14px;
  }

  /* Image block */
  .card__image {
    width: 100%;
    height: 320px;
    border-radius: 0.5rem;
  }

  /* Icons */
  .card__icon {
    width: 100px;
    height: 14px;
  }

  /* Comment input */
  .card__input {
    width: 70%;
    height: 14px;
  }

  .card__button {
    width: 50px;
    height: 14px;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

export default Loader;
