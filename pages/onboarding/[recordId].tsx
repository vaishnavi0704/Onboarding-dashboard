export const getServerSideProps: GetServerSideProps = async (context) => {
  const { recordId } = context.params as { recordId: string };
  console.log('Fetching recordId:', recordId);

  if (!recordId.match(/^[a-zA-Z0-9]+$/)) {
    console.log('Invalid recordId format');
    return { props: { error: 'Invalid Record ID format' } };
  }

  try {
    console.log('Making Airtable request...');
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        },
      }
    );

    console.log('Airtable response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Airtable error:', errorText);
      throw new Error(`Airtable fetch failed: ${errorText || 'Record not found'}`);
    }

    const data = await response.json();
    console.log('Airtable data:', data);
    const candidateData: CandidateData = {
      // ... (rest of the code)
    };

    return { props: { candidateData } };
  } catch (err) {
    console.error('getServerSideProps Error:', err);
    return { props: { error: 'Failed to load candidate details. Please check your Record ID.' } };
  }
};
