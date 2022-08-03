namespace Legit.DomainModels.RegistrationDomain;

public enum ProgressEventType
{
	DATA,
	CLOSE
}

public record ProgressEvent(
	string CloneId,
	string EventId,
	string Message,
	ProgressEventType EventType
) {
	public ProgressEvent WithEventId(string Id)
	{
		return new ProgressEvent(this.CloneId, Id, this.Message, this.EventType);
	}
};
