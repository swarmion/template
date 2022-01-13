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
  const stackIdMatch = new RegExp(/StackId='(?<stackId>[\w\d-:./]+)'\n/).exec(
    record.Sns.Message,
  );
  const stackId = stackIdMatch?.groups?.stackId;

  const timestampMatch = new RegExp(
    /Timestamp='(?<timestamp>[\w\d:.-]+)'\n/,
  ).exec(record.Sns.Message);
  const timestamp = timestampMatch?.groups?.timestamp;

  await DeploymentEvent.put({
    stackId,
    timestamp,
  });
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
