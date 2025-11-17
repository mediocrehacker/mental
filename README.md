# Description of the idea

## The question:

How can you take stock of mental health in your workplace?

The Mental Score app helps you assess mental health across your organization.

## Why this matters

Mental health is crucial in the 21st century because it reduces stigma, encourages people to seek help, and promotes overall well-being. Prioritizing mental health in the workplace has become an essential task for managers.

A common question from managers and HR personnel is:

> How can we assess the mental health of our employees?

Although many frameworks, applications, and employee surveys exist for evaluating mental well-being, they all face a fundamental issue: not everyone is willing to share their mental state openly. Traditionally, confidentiality is protected through point 4 of the Therapist's Oath:

> Therapist's Oath
> ...
> 4. I will be silent when it is time to be silent, protecting the sacred oath of confidentiality.

In the digital world, however, guaranteeing confidentiality is challenging. User information is often stored in a single centralized database, and any breach can expose sensitive personal data.

**How the Mental Score app solves this**

The Mental Score app enables mental-health screening using zero-knowledge proof technology powered by Midnight, ensuring confidentiality while still providing valuable insights.

Let's take a look at how it works.

## Step-by-step process

1. Assessment creation
An admin user—typically HR or a manager—creates the Patient Health Questionnaire (PHQ-9) to assess depression levels.
During this step, the application deploys a smart contract to the Midnight blockchain and returns the contract address.

2. Employees participate
Employees join the smart contract and answer the questions.
They receive their personal depression level, along with summaries and recommendations.
Their results are stored on the blockchain, but all confidential information is kept off-chain and stored locally.

3. Manager insights
Managers can view the average depression level across the company—without accessing any individual's private data.

4. Repeat for other mental-health dimensions
The same process applies to Anxiety, Somatic symptoms, and Burnout questionnaires.

Once all questionnaires are completed, the application calculates the Mental Score for the team.
This score is visible to everyone, while personal information remains confidential forever.

A best practice is to repeat the screening annually to track progress over time.


# Development

```bash
yarn install
turbo build
turbo dev
```
