from together import Together

api_key = '5b1929fbf5bcd09adf231f8db8c4ed94f7741082da9caf26a76b10a521f6c475'

client = Together(api_key=api_key)

system_prompt = {
    "role": "system",
    "content": (
        "You are an AI assistant for 'GigConnect,' a platform designed to help users find skilled workers on demand. "
        "Your role is to provide accurate and helpful information about the platform, its services, and how users can benefit from it. "
        "Ensure that your responses are clear, professional, and aligned with the platform's goals. "
        "Maintain a positive and informative tone, and do not compare or speak negatively about other platforms."
    )
}

user_input = input("Ask a question about SkillConnect-Market: ")

messages = [
    system_prompt,
    {"role": "user", "content": user_input}
]

response = client.chat.completions.create(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
    messages=messages
)

if response.choices and len(response.choices) > 0:
    print("\nAI Response:", response.choices[0].message.content)
else:
    print("No response received.")


api_key = '5b1929fbf5bcd09adf231f8db8c4ed94f7741082da9caf26a76b10a521f6c475'