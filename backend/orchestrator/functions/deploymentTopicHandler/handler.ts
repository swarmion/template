import DeploymentEvent from 'libs/models/deploymentEvent';

interface SnsRecord {
  EventSource: 'aws:sns';
  EventVersion: '1.0';
  EventSubscriptionArn: string;
  Sns: {
    Type: string;
    MessageId: string;
    TopicArn: string;
    Subject: string;
    Message: string;
    Timestamp: string;
    SignatureVersion: string;
    Signature: string;
    SigningCertUrl: string;
    UnsubscribeUrl: string;
    MessageAttributes: Record<string, unknown>;
  };
}

const storeDeploymentRecord = async (record: SnsRecord): Promise<void> => {
  await DeploymentEvent.put({
    stackId: '15',
    timestamp: '2022-01-13T17:27:23.547Z',
  });

  console.log(JSON.stringify(record.Sns.Message));
};

export const main = async ({
  Records,
}: {
  Records: SnsRecord[];
}): Promise<void> => {
  await Promise.all(
    Records.map(async record => await storeDeploymentRecord(record)),
  );
};
